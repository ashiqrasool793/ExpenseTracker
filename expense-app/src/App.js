import Home from "./components/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Categories from "./components/Categories";
import Expenses from "./components/Expenses";
import NavBar from "./components/NavBar";
import { Layout } from "antd";

const { Header, Content } = Layout;

function App() {
  return (
    <Router>
      <Layout>
        <Header>
          <NavBar />
        </Header>
        <Content style={{ height: "100vh", padding: "0 50px" }}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/categories" component={Categories} />
            <Route path="/expenses" component={Expenses} />
          </Switch>
        </Content>
      </Layout>
    </Router>
  );
}

export default App;
