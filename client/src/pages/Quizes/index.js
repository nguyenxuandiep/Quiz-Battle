import React, { useState } from "react";
import Quiz from "./Quiz/Quiz";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import styles from "./Quizes.module.scss";
import { Chip, TextField } from '@mui/material';
import {
  AppBar,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { getQuizesBySearch } from "../../actions/quiz";
import Pagination from "../Pagination/index";
import classNames from "classnames/bind";

const cx = classNames.bind(styles);

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Quizes() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizes, isLoading } = useSelector((state) => state.quiz);

  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");

  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const searchPost = () => {
    if (search.trim() !== "" || tags.length !== 0) {
      console.log(search.trim());
      dispatch(getQuizesBySearch({ search, tags: tags.join(",") }));
      navigate(
        `/quizes/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      navigate("/quizes");
    }
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <div className={cx("quizes-list")}>
      <AppBar className={cx("appBarSearch")} position="static" color="inherit">
        <TextField
          onKeyDown={handleKeyPress}
          name="search"
          variant="outlined"
          label="Search quizes by name"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Chip
          style={{ margin: "10px 0" }}
          value={tags}
          onAdd={(chip) => handleAddChip(chip)}
          onDelete={(chip) => handleDeleteChip(chip)}
          label="Search quizes by tags"
          variant="outlined"
        />
        <Button
          onClick={searchPost}
          className={cx("searchButton")}
          variant="contained"
          color="primary"
        >
          {" "}
          Search
        </Button>
      </AppBar>
      {isLoading ? (
        <CircularProgress />
      ) : (
        quizes.map((quiz) => <Quiz key={quiz._id} quiz={quiz} />)
      )}
      {!searchQuery && !tags.length && (
        <Paper className={cx("pagination")} elevation={6}>
          <Pagination page={page} />
        </Paper>
      )}
    </div>
  );
}

export default Quizes;
