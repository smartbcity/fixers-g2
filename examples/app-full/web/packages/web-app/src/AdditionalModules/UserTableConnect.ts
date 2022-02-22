import { connect } from "react-redux";
import { State } from "store";
import { refs } from "store/refs";
import { router } from "store/router";

const mapStateToProps = (state: State) => ({
  orgnaizationsRefs: refs.selectors.organizationsRefs(state),
});

const mapDispatchToProps = {
  gotoUserTable: router.gotoAditionalModules.userTable,
};

export default connect(mapStateToProps, mapDispatchToProps);
