import React, { useRef } from "react";

export function StarGradient({ fillColor, blankColor, fillPercent, uniqueId }: { fillColor: string, blankColor: string, fillPercent: number, uniqueId: string }) {

  const gradientId = `${uniqueId}-gradient`

  return (

    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={`url(#${gradientId})`} className="m-auto bi bi-star-fill" viewBox="0 0 16 16">

      <linearGradient id={gradientId}>
        <stop offset={`0%`} stopColor={fillColor} />
        <stop offset={`${fillPercent}%`} stopColor={fillColor} />
        <stop offset={`${fillPercent}%`} stopColor={blankColor} />
        <stop offset={`100%`} stopColor={blankColor} />

      </linearGradient>

      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  );
}

export function StarFilled({fillColor}: {fillColor: string}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={fillColor} className="bi bi-star-fill" viewBox="0 0 16 16">
      <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
    </svg>
  );
}