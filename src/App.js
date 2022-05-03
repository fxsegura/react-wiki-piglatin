import './App.css';
import { useLocation } from 'react-router-dom';
import React, { useState, useEffect } from "react";
import { pigLatin } from './pig-latin/pigLatin';

function App() {
  const [content, setContent] = useState([]);

  let url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&explaintext=1&format=json&titles=";
  let pathname = useLocation().pathname;
  pathname=pathname.replace('/','');
  url=url.concat(url,pathname);
  
  const extractAPIContents = json => {
    const { pages } = json.query;
    return Object.keys(pages).map(id => pages[id].extract);
  };

  const getContent = async () => {
    let resp;
    let content = [];
    resp = await fetch(url);
    const json = await resp.json();
    content = extractAPIContents(json);
    content[0]=pigLatin(content[0]);
    setContent(content);
  };

  useEffect(() => {
    getContent();
  }, []);

  return (
    <div>
      <h1>Article</h1>
      {content}
    </div>
  );
}

export default App;
