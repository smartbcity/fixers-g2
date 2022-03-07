import { connect } from "react-redux";
import { router } from "store/router";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  gotoEditOrganization: router.gotoAditionalModules.editOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps);
