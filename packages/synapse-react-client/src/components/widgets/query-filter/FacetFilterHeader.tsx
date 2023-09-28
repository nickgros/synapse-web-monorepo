import React from 'react'
import IconPlus from '../../../assets/icons/IconPlus'
import IconMinus from '../../../assets/icons/IconMinus'

export type FacetFilterHeaderProps = {
  label: string
  hideCollapsible?: boolean
  isCollapsed: boolean
  onClick: (newValue: boolean) => void
}

export function FacetFilterHeader(props: FacetFilterHeaderProps) {
  const { label, isCollapsed, onClick, hideCollapsible = false } = props
  return (
    <div className="FacetFilterHeader">
      <label className="FacetFilterHeader__label">{label}</label>
      {!hideCollapsible && (
        <button
          className="FacetFilterHeader__collapseToggleBtn"
          onClick={() => onClick(!isCollapsed)}
        >
          {isCollapsed ? (
            <IconPlus className="icon-plus" title="Expand Menu" />
          ) : (
            <IconMinus className="icon-minus" title="Collapse Menu" />
          )}
        </button>
      )}
    </div>
  )
}
