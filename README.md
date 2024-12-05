body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.container {
  display: grid;
  grid-template-areas: 
    "header header header"
    "aside1 main aside2"
    "footer footer footer";
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 1fr 2fr 1fr;
  height: 100vh;
  gap: 10px;
}

header {
  grid-area: header;
  background-color: #ff6347;
  text-align: center;
  padding: 10px;
  font-size: 1.5rem;
}

.aside1 {
  grid-area: aside1;
  background-color: #f4d03f;
  padding: 10px;
}

main {
  grid-area: main;
  background-color: #5dade2;
  padding: 10px;
}

.aside2 {
  grid-area: aside2;
  background-color: #f5b7b1;
  padding: 10px;
}

footer {
  grid-area: footer;
  background-color: #82e0aa;
  text-align: center;
  padding: 10px;
}
