import { connect } from "react-redux";
import { router } from "store/router";

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  gotoOrganizationTable: router.gotoAditionalModules.organizationTable,
  gotoCreateOrganization: router.gotoAditionalModules.createOrganization,
};

export default connect(mapStateToProps, mapDispatchToProps);
