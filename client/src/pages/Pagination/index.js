import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Pagination, PaginationItem } from "@mui/material";
import { makeStyles } from "@mui/material/styles"

import { Link } from "react-router-dom"

import { getPublicQuizes } from "../../actions/quiz"
import classNames from "classnames/bind";
import styles from './Pagination.module.scss'


const cx = classNames.bind(styles);
const Paginate = ({ page }) => {
  const { numberOfPages } = useSelector((state) => state.quiz)
  const dispatch = useDispatch()


  useEffect(() => {
    if (page) {
      dispatch(getPublicQuizes(page))
    }
  }, [dispatch, page])

  return (
    <Pagination
      classes={cx('ul')}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="primary"
      renderItem={(item) => (
        <PaginationItem
          {...item}
          component={Link}
          to={`/quizes?page=${item.page}`}
        />
      )}
    />
  )
}

export default Paginate
