import { TouchEventHandler, useRef } from 'react';

const usePreventSwipeOnScroll = () => {
  const isScrolling = useRef(false);

  const handleScroll = () => {
    isScrolling.current = true;
  };

  const handleScrollEnd = () => {
    isScrolling.current = false;
  };

  const handleTouchMove: TouchEventHandler<HTMLElement> = (event) => {
    if (isScrolling.current) {
      event.stopPropagation();
    }
  };

  return { handleScroll, handleScrollEnd, handleTouchMove };
};

export default usePreventSwipeOnScroll;
