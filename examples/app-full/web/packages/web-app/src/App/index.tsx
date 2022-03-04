import { Box } from "@mui/material";
import { useInitStore } from "store/init";
import { AppRouter } from "./routes";
import connect from "./Connect";
import { OrganizationRef } from "@smartb/g2-i2";

interface AppProps {
  setOrganizationsRefs: (organizationsRefs: OrganizationRef[]) => void;
}

const App = connect((props: AppProps) => {
  const { setOrganizationsRefs } = props;

  useInitStore({
    setOrganizationsRefs: setOrganizationsRefs,
  });

  return (
    <Box
      sx={{
        padding: "40px",
      }}
    >
      <AppRouter />
    </Box>
  );
});

export default App;
