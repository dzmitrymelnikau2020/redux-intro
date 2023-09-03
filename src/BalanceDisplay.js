import { connect } from "react-redux";

function formatCurrency(value, handleClick) {
  return new Intl.NumberFormat("en", {
    style: "currency",
    currency: "USD",
  }).format(value);
}

function BalanceDisplay({balance}) {
  return <div className="balance">{formatCurrency(123456)}</div>;
}

const mapStateToProps = (state) => {
  return {
      balance: state.account.balance
  }
}

const mapDispatchToProps = (dispatch) => {
  return { 
    handleClick: (value) => dispatch({type: 'account/...', payload: value})}
}

export default connect(mapStateToProps, mapDispatchToProps)(BalanceDisplay);
