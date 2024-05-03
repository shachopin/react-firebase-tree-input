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
          <pre
            style={{
              margin: "0px",
              padding: "10px",
              border: "1px solid grey",
              backgroundColor: "#e8e8af",
            }}
          >
            {state.desc}
          </pre>
        </div>
      </div>
    )}
  </>
);
