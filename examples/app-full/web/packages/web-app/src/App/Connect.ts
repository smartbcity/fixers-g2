import { connect } from "react-redux";
import { refs } from "store/refs";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  setOrganizationsRefs: refs.actions.setOrganizationsRefs,
};

export default connect(mapStateToProps, mapDispatchToProps);
