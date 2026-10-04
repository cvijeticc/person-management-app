import { Stack, DefaultButton, PrimaryButton, Text } from "@fluentui/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

// dugmad sa strelicama i brojevima su uska da stane vise strana u red
const buttonStyles = { root: { minWidth: 40, padding: 0 } };

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages === 0) {
    return null;
  }

  // uvek se prikazuju prva i poslednja strana i po jedna strana oko trenutne
  // na samom pocetku i kraju prikazu se tri strane (1 2 3 ... 6 ili 1 ... 98 99 100)
  let from = page - 1;
  let to = page + 1;
  if (page <= 2) {
    from = 1;
    to = 3;
  }
  if (page >= totalPages - 1) {
    from = totalPages - 2;
    to = totalPages;
  }

  const pages: number[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= from && i <= to)) {
      pages.push(i);
    }
  }

  // izmedju brojeva koji nisu jedan za drugim ide "..."
  const items: (number | string)[] = [];
  pages.forEach((number, index) => {
    if (index > 0 && number - pages[index - 1] > 1) {
      items.push("..." + number); // number se dodaje da key bude jedinstven
    }
    items.push(number);
  });

  return (
    <Stack
      horizontal
      verticalAlign="center"
      tokens={{ childrenGap: 5 }}
      styles={{ root: { marginTop: 15 } }}
    >
      <DefaultButton
        text="«"
        styles={buttonStyles}
        disabled={page === 1}
        onClick={() => onPageChange(1)}
      />
      <DefaultButton
        text="‹"
        styles={buttonStyles}
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      />
      {items.map((item) => {
        if (typeof item === "string") {
          return (
            <Text key={item} styles={{ root: { padding: "0 8px" } }}>
              ...
            </Text>
          );
        }
        // trenutna strana je istaknuta
        return item === page ? (
          <PrimaryButton key={item} text={String(item)} styles={buttonStyles} />
        ) : (
          <DefaultButton
            key={item}
            text={String(item)}
            styles={buttonStyles}
            onClick={() => onPageChange(item)}
          />
        );
      })}
      <DefaultButton
        text="›"
        styles={buttonStyles}
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      />
      <DefaultButton
        text="»"
        styles={buttonStyles}
        disabled={page === totalPages}
        onClick={() => onPageChange(totalPages)}
      />
    </Stack>
  );
}

export default Pagination;
