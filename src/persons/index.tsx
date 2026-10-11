import { useEffect, useState } from "react";
import {
  Text,
  DefaultButton,
  Stack,
  Spinner,
  SpinnerSize,
  MessageBar,
  MessageBarType,
} from "@fluentui/react";
import Filter, { getUserType, FilterState } from "./filter";
import Kreiranje, { KreiranjeState } from "./kreiranje";
import Azuriranje, { AzuriranjeState } from "./azuriranje";
import Table, { Column } from "../common/components/Table";
import * as Api from "./api";

// TODO: Razmisli o useReducer?

type Loading = { type: "Loading" };
type Loaded = {
  type: "Loaded";
  data: Api.Person[];
  filter: FilterState;
  kreiranje: KreiranjeState;
  azuriranje: AzuriranjeState;
  selectedRow: Api.Person | null;
};
type Failed = { type: "Failed"; error: string };

type State = Loading | Loaded | Failed;

const INIT_LOADING_STATE: Loading = { type: "Loading" };

const PersonsScreen: React.FC = () => {
  const [state, setState] = useState<State>(INIT_LOADING_STATE);

  useEffect(() => {
    Api.getPersons().then((response) => {
      switch (response.type) {
        case "Success":
          return setState({
            type: "Loaded",
            data: response.data,
            kreiranje: { isVisible: false },
            azuriranje: { isVisible: false, original: null },
            selectedRow: null,
            filter: {
              isVisible: false,
              selectedUserType: null,
              userTypes: getUserType(response.data),
              userName: "",
            },
          });
        case "Failure":
          return setState({ type: "Failed", error: response.error });
      }
    });
  }, []);

  const toggleFilter = () =>
    setState((state) => {
      if (state.type === "Loaded") {
        return {
          ...state,
          filter: { ...state.filter, isVisible: !state.filter.isVisible },
        };
      }
      return state;
    });

  const onChangeUserType = (selectedUserType: string | null) => {
    setState((state) => {
      if (state.type === "Loaded")
        return {
          ...state,
          filter: {
            ...state.filter,
            selectedUserType,
          },
        };
      return state;
    });
  };

  const onChangeUserName = (userName: string) => {
    setState((state) => {
      if (state.type === "Loaded")
        return {
          ...state,
          filter: {
            ...state.filter,
            userName,
          },
        };
      return state;
    });
  };

  const onStartKreiranje = () => {
    setState((state) => {
      if (state.type === "Loaded") {
        return {
          ...state,
          kreiranje: {
            isVisible: true,
          },
        };
      }
      return state;
    });
  };

  const onCancelKreiranje = () => {
    setState((state) => {
      if (state.type === "Loaded") {
        return {
          ...state,
          kreiranje: {
            isVisible: false,
          },
        };
      }
      return state;
    });
  };

  const onStartAzuriranje = (person: Api.Person) => {
    setState((state) => {
      if (state.type === "Loaded") {
        return {
          ...state,
          azuriranje: {
            isVisible: true,
            original: person,
          },
        };
      }
      return state;
    });
  };

  const onCancelAzuriranje = () => {
    setState((state) => {
      if (state.type === "Loaded") {
        return {
          ...state,
          azuriranje: {
            isVisible: false,
            original: null,
          },
        };
      }
      return state;
    });
  };

  const filterPersons = (
    data: Api.Person[],
    filter: FilterState,
  ): Api.Person[] =>
    data.filter((person) => {
      const matchesName = person.name
        .toLowerCase()
        .includes(filter.userName.toLowerCase());

      const matchesUserType =
        filter.selectedUserType === null ||
        person.userType.toLowerCase() === filter.selectedUserType;

      return matchesName && matchesUserType;
    });

  const columns: Column<Api.Person>[] = [
    {
      key: "name",
      name: "Ime",
      fieldName: "name",
      minWidth: 70,
      maxWidth: 100,
    },
    {
      key: "surname",
      name: "Prezime",
      fieldName: "surname",
      minWidth: 80,
      maxWidth: 110,
    },
    {
      key: "userType",
      name: "Tip korisnika",
      fieldName: "userType",
      minWidth: 90,
      maxWidth: 110,
    },
    {
      key: "createdDate",
      name: "Datum kreiranja",
      fieldName: "createdDate",
      minWidth: 100,
      maxWidth: 110,
    },
    {
      key: "city",
      name: "Grad",
      fieldName: "city",
      minWidth: 70,
      maxWidth: 100,
    },
    {
      key: "address",
      name: "Adresa",
      fieldName: "address",
      minWidth: 115,
      maxWidth: 165,
    },
  ];

  const renderContent = () => {
    switch (state.type) {
      case "Loading":
        return <Spinner size={SpinnerSize.large} label="Učitavam podatke..." />;

      case "Loaded": {
        const filteredData = filterPersons(state.data, state.filter);

        return (
          <>
            <Stack
              horizontal={true}
              horizontalAlign="space-between"
              verticalAlign="center"
            >
              <Text>Pretraga korisnika</Text>
              <Stack horizontal={true} tokens={{ childrenGap: 10 }}>
                <DefaultButton text="Filter" onClick={toggleFilter} />
                <DefaultButton text="Kreiranje" onClick={onStartKreiranje} />
                {state.selectedRow ? (
                  <DefaultButton
                    text="Azuriranje"
                    onClick={() => onStartAzuriranje(state.selectedRow!)}
                  />
                ) : null}
              </Stack>
            </Stack>
            <Filter
              {...state.filter}
              onChangeUserName={onChangeUserName}
              onChangeUserType={onChangeUserType}
            />
            <Table data={filteredData} columns={columns} />
            {state.kreiranje.isVisible ? (
              <Kreiranje {...state.kreiranje} onCancel={onCancelKreiranje} />
            ) : null}
            {state.azuriranje.isVisible ? (
              <Azuriranje {...state.azuriranje} onCancel={onCancelAzuriranje} />
            ) : null}
          </>
        );
      }
      case "Failed":
        return (
          <MessageBar messageBarType={MessageBarType.error}>
            {state.error}
          </MessageBar>
        );
    }
  };

  return (
    <Stack grow={1} styles={{ root: { padding: 10 } }}>
      {renderContent()}
    </Stack>
  );
};

export default PersonsScreen;
