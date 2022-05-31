import {
  ForwardedRef, forwardRef, MouseEvent,
} from 'react';

const EDIT_CIRCLE_RADIUS = 2;

const Tools = forwardRef(({ onSizingStart }: PropsTypes, ref:ForwardedRef<SVGGElement>) => {
  return (
    <g
      ref={ref}
    >
      <circle
        style={{ cursor: 'nw-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="top-left"
      />
      <circle
        style={{ cursor: 'pointer' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="rotation"
      />
      <circle
        style={{ cursor: 'ne-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="top-right"
        onMouseDown={(e) => {
          onSizingStart(e, 'topRight');
        }}
      />
      <circle
        style={{ cursor: 'ne-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="bottom-left"
        onMouseDown={(e) => {
          onSizingStart(e, 'bottomLeft');
        }}
      />
      <circle
        style={{ cursor: 'nw-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="bottom-right"
        onMouseDown={(e) => {
          onSizingStart(e, 'bottomRight');
        }}
      />
    </g>
  );
});

export default Tools;

interface PropsTypes {
  onSizingStart:(e: MouseEvent, resizeBtn: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => void,
}
