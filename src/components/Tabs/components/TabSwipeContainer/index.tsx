import { TouchEvent, useRef, type PropsWithChildren, type TouchEventHandler } from 'react';
import { useTabs } from '../../context';

interface ITouchData {
  id: number;
  startX: number;
  startTime: number;
  deltaX?: number;
}

export const TabSwipeContainer = ({ children }: PropsWithChildren) => {
  const { changeTabBySwipe } = useTabs();

  const containerRef = useRef<HTMLDivElement>(null);

  const touchData = useRef<ITouchData>(undefined);

  const isFirstTouchEvent = (event: TouchEvent<HTMLDivElement>) => {
    return event.changedTouches[0].identifier === touchData.current?.id;
  };

  const getTouchMoveInPixel = (event: TouchEvent<HTMLDivElement>) => {
    return event.changedTouches[0].clientX - touchData.current!.startX;
  };

  const handleTouchStart: TouchEventHandler<HTMLDivElement> = (event) => {
    if (event.touches.length !== 1) return;

    touchData.current = {
      startTime: event.timeStamp,
      startX: event.touches[0].clientX,
      id: event.touches[0].identifier,
    };
  };

  const handleTouchMove: TouchEventHandler<HTMLDivElement> = (event) => {
    if (!containerRef.current || !touchData.current || !isFirstTouchEvent(event)) return;

    const deltaX = getTouchMoveInPixel(event);

    containerRef.current.style.setProperty('transform', `translateX(${deltaX}px)`);

    touchData.current.deltaX = deltaX;
  };

  const handleTouchEnd: TouchEventHandler<HTMLDivElement> = (event) => {
    if (!containerRef.current || !isFirstTouchEvent(event)) return;

    const { clientWidth } = containerRef.current;

    const { deltaX } = touchData.current!;

    containerRef.current.style.removeProperty('transform');

    if (!deltaX) return;

    if (clientWidth / 3 < Math.abs(deltaX)) {
      changeTabBySwipe(0 < deltaX ? 'right' : 'left');
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
    >
      {children}
    </div>
  );
};
