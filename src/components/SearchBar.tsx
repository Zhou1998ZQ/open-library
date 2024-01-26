import { Form } from "react-bootstrap";

const SearchBar = () => {
  return (
    <>
      <Form.Control
        type="text"
        style={{ marginTop: "20px" }}
        placeholder="Search the title"
      />
    </>
  );
};

export default SearchBar;
