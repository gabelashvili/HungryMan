import {
  ForwardedRef, forwardRef,
} from 'react';

const EDIT_CIRCLE_RADIUS = 2;

const Tools = forwardRef((params, ref:ForwardedRef<SVGGElement>) => {
  return (
    <g ref={ref}>
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
      />
      <circle
        style={{ cursor: 'ne-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="bottom-left"
      />
      <circle
        style={{ cursor: 'nw-resize' }}
        r={EDIT_CIRCLE_RADIUS}
        fill="rgba(0, 168, 255, 1)"
        id="bottom-right"
      />
    </g>
  );
});

export default Tools;
