import { Stack, DefaultButton, PrimaryButton } from "@fluentui/react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  // pravi niz brojeva strana: [1, 2, 3, ...]
  const pages: number[] = [];
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
          <PrimaryButton key={number} text={String(number)} />
        ) : (
          <DefaultButton
            key={number}
            text={String(number)}
            onClick={() => onPageChange(number)}
          />
        ),
      )}
    </Stack>
  );
}

export default Pagination;
