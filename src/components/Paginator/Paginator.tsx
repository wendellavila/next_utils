'use client';
import { HoverLabel } from '../HoverLabel';
import { NumberedPaginatorButtons } from './NumberedPaginatorButtons';
import { PaginatorButton } from './PaginatorButton';

interface PaginatorProps {
  count: number;
  limit: number;
  currentIndex: number;
}

export function Paginator(props: PaginatorProps) {
  const { count, limit, currentIndex } = props;
  const pages = Math.ceil(count / limit);

  const handleClick = (index: number) => {
    // setState or router goes here to change index and make component rerender
  };

  return (
    <div className="flex flex-row justify-center flex-wrap gap-x-3 my-2">
      <div className="relative group">
        <HoverLabel wrap={true} className="md:min-w-44">
          Update current page
        </HoverLabel>
        <PaginatorButton
          onClick={() => handleClick(currentIndex)}
          className="px-2"
        >
          <div className="inline-block rotate-45">↻</div> Update
        </PaginatorButton>
      </div>
      <div className="flex flex-row justify-center flex-nowrap">
        <div className="relative group">
          <HoverLabel
            wrap={true}
            className="md:min-w-32"
            state={currentIndex <= 1 ? 'disabled' : 'normal'}
          >
            Previous page
          </HoverLabel>
          <PaginatorButton
            state={currentIndex <= 1 ? 'disabled' : 'normal'}
            onClick={() => handleClick(currentIndex - 1)}
          >
            ❮
          </PaginatorButton>
        </div>
        <NumberedPaginatorButtons
          index={currentIndex}
          pages={pages}
          handleClick={handleClick}
        />
        <div className="relative group">
          <HoverLabel
            wrap={true}
            className="md:min-w-24"
            state={currentIndex >= pages ? 'disabled' : 'normal'}
          >
            Next page
          </HoverLabel>
          <PaginatorButton
            state={currentIndex >= pages ? 'disabled' : 'normal'}
            onClick={() => handleClick(currentIndex + 1)}
          >
            ❯
          </PaginatorButton>
        </div>
      </div>
    </div>
  );
}
