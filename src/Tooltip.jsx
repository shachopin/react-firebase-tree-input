export const Tooltip = ({state, showFixedTooltip, showTooltip}) => (
  <>
    {state.desc && (
      <div className="row">
        <div
          style={{
            display: showFixedTooltip || showTooltip ? "block" : "none",
          }}
          className="col-xs-5 col-xs-offset-5"
        >
          <div
            style={{
              margin: "3px",
              padding: "10px",
              border: "1px solid grey",
              backgroundColor: "#e8e8af",
            }}
          >
            {state.desc}
          </div>
        </div>
      </div>
    )}
  </>
);
