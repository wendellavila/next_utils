import { HoverLabel } from '../HoverLabel';
import { PaginatorButton } from './PaginatorButton';

interface NumberedPaginatorButtonsProps {
  index: number;
  pages: number;
  handleClick: (index: number) => void;
}

export function NumberedPaginatorButtons(props: NumberedPaginatorButtonsProps) {
  const { index, handleClick, pages } = props;
  const indexes = [];

  let startIndex = index - 2;
  let endIndex = index + 3;
  if (startIndex == -1) {
    startIndex += 2;
    endIndex += 2;
  } else if (startIndex == 0) {
    startIndex += 1;
    endIndex += 1;
  } else if (endIndex - pages == 2) {
    startIndex -= 1;
    endIndex -= 1;
  } else if (endIndex - pages == 3) {
    startIndex -= 2;
    endIndex -= 2;
  }

  for (let i = startIndex; i < endIndex; i++) {
    indexes.push(i);
  }
  return (
    <>
      {startIndex > 1 && (
        <div className="relative group">
          <HoverLabel>{`Page 1`}</HoverLabel>
          <PaginatorButton onClick={() => handleClick(1)}>{1}</PaginatorButton>
          <span className="mx-1">...</span>
        </div>
      )}
      {indexes.map(indexNumber => (
        <div className="relative group" key={`pagination-link-${indexNumber}`}>
          <HoverLabel
            state={indexNumber == index ? 'active' : 'normal'}
          >{`Page ${indexNumber}`}</HoverLabel>
          <PaginatorButton
            state={indexNumber == index ? 'active' : 'normal'}
            onClick={() => handleClick(indexNumber)}
          >
            {indexNumber}
          </PaginatorButton>
        </div>
      ))}
      {endIndex < pages && (
        <div className="relative group">
          <span className="mx-1">...</span>
          <HoverLabel>{`Page ${pages}`}</HoverLabel>
          <PaginatorButton onClick={() => handleClick(pages)}>
            {pages}
          </PaginatorButton>
        </div>
      )}
    </>
  );
}
