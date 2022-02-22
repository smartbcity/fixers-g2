import { connect } from "react-redux";
import { router } from "store/router";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  gotoEditUser: router.gotoAditionalModules.editUser,
};

export default connect(mapStateToProps, mapDispatchToProps);
