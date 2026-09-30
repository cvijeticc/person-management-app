import { Stack, DefaultButton, PrimaryButton } from "@fluentui/react";

function Pagination({ page, totalPages, onPageChange }) {
  // pravi niz brojeva strana: [1, 2, 3, ...]
  const pages = [];
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <Stack
      horizontal
      tokens={{ childrenGap: 5 }}
      styles={{ root: { marginTop: 15 } }}
    >
      {pages.map((number) =>
        // trenutna strana je istaknuta
        number === page ? (
          <PrimaryButton key={number} text={number} />
        ) : (
          <DefaultButton
            key={number}
            text={number}
            onClick={() => onPageChange(number)}
          />
        ),
      )}
    </Stack>
  );
}

export default Pagination;
