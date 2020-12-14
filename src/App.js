import React, { useEffect, useState } from "react";
import AlanButton from "@alan-ai/alan-sdk-web";
import NewsCard from "./components/newsCards/NewsCards";
import useStyles from "./style";
import "./App.css";
import { BrowserRouter as Router, Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MessengerCustomerChat from "react-messenger-customer-chat";
const alankey =
  "ae8cd43e18da8f2fd51c18260925d3352e956eca572e1d8b807a3e2338fdd0dc/stage";

toast.configure();

function App() {
  const [newsAtricles, setnewsAtricles] = useState([]);
  const [active, setActive] = useState(0);
  const classes = useStyles();
  const remove = () => {
    setnewsAtricles([]);
  };

  useEffect(() => {
    toast.info(
      'If you are confused, click the mike icon and say "What does this app do?" or "What can i do here" Alan will give you instruction to get started',
      { position: toast.POSITION.TOP_LEFT, autoClose: false }
    );

    AlanButton({
      key: alankey,
      onCommand: ({ command, articles }) => {
        if (command === "newHeadlines") {
          setnewsAtricles(articles);
          // setActive(-1);
        } else if (command === "highlight") {
          setActive(() => {
            setActive((prevActive) => prevActive + 1);
          });
        }
      },
    });
  }, []);

  return (
    <Router>
      <div className="App">
        <div>
          <MessengerCustomerChat
            pageId="100972251759163"
            appId="1012992322500389"
          />
        </div>

        <div className={classes.logoContainer}>
          <Link to="/">
            <img
              src="https://alan.app/voice/images/previews/preview.jpg"
              className={classes.alanLogo}
              alt="logo"
            />
          </Link>

          {newsAtricles.length === 0 ? null : (
            <Button onClick={remove} size="small" color="secondary">
              Clear news
            </Button>
          )}
        </div>
        <NewsCard articles={newsAtricles} active={active} />
      </div>
    </Router>
  );
}

export default App;
