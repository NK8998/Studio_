import { useDispatch } from "react-redux";
import { DateFormatter } from "../../../../../utilities/date-formatter";
import { TableVideoComponent } from "./table-video-component";
import { subscribeToSupabase, updateCurrentVideo, updateCurrentVideoId } from "../../../../../store/Upload-slice";
import { toggleUploadCard } from "../../../../../store/App-slice";
import prcessingImg from "../../../../../assets/processing.jpg";
import { useEffect, useState } from "react";
import RowHandler from "./row-handler";

const TableComponent = ({ data, columns }) => {
  const [rows, setRows] = useState(3);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const rowsPerPage = JSON.parse(localStorage.getItem("rowsPerPage")) || 10;
    setRows(rowsPerPage);
  }, []);

  function subdivideArray(array, n) {
    let result = [];
    for (let i = 0; i < array.length; i += n) {
      result.push(array.slice(i, i + n));
    }
    return result;
  }
  const rowGroups = subdivideArray(data, rows) || [];
  const rowGroupToRender = rowGroups[currentPage] || [];

  const dispatch = useDispatch();
  const firstHeader = columns.slice(0, 1);

  const leftSide = firstHeader.map((header, index) => {
    return (
      <div className='left-row-sticky  row-column first-col' key={index}>
        <div className='row-selector-container'>
          <div className='primary-selector row-selector'></div>
        </div>
        <p className={header}>{header}</p>
      </div>
    );
  });
  const restHeaders = columns.slice(1, columns.length);

  const rightSide = restHeaders.map((header, index) => {
    return (
      <p className={`${header} row-column`} key={index}>
        {header}
      </p>
    );
  });

  const editDraft = (tableData) => {
    dispatch(updateCurrentVideoId(tableData.video_id));
    dispatch(updateCurrentVideo({ ...tableData }));
    dispatch(toggleUploadCard());
    if (!tableData.mpd_url) {
      dispatch(subscribeToSupabase(tableData.video_id));
    }
  };

  const rowElements = rowGroupToRender.map((tableData, index) => {
    const likeDislikeRatio = (tableData.likes / (tableData.likes + tableData.dislikes)) * 100;
    return (
      <div className='row-data' key={index}>
        <div className={`left-row-sticky row-column first-col `}>
          <div className='row-selector-container'>
            <div className='secondary-selector row-selector'></div>
          </div>
          <TableVideoComponent
            id={tableData.video_id}
            thumbnail={
              tableData.preferred_thumbnail_url
                ? tableData.preferred_thumbnail_url
                : tableData.possible_thumbnail_urls
                ? tableData.possible_thumbnail_urls["thumbnailUrl-0"]
                : prcessingImg
            }
            title={tableData.title}
            description={tableData.description_string ? tableData.description_string : "Add description"}
            timestamp={tableData.duration_timestamp}
          />
        </div>
        <div className='right-side-scrollable'>
          <div className={`row-visibility row-column Visibility`}>{tableData.visibility}</div>
          <div className='row-restriction row-column Restriction'>{tableData.restrictions}</div>
          <div className='row-date row-column Date'>{tableData.visibility !== "Draft" && DateFormatter(tableData.created_at)}</div>
          <div className='row-views row-column Views'>{tableData.visibility !== "Draft" && tableData.views}</div>
          <div className='row-views row-column Comments'>{tableData.visibility !== "Draft" && tableData.comments}</div>
          <div className='row-likes-dislikes-ratio row-column Likes'>
            <p>{tableData.visibility !== "Draft" && `${likeDislikeRatio || 0}%`}</p>
          </div>
        </div>
        {tableData.visibility === "Draft" && (
          <div
            className='edit-draft'
            onClick={() => {
              editDraft(tableData);
            }}
          >
            <p>EDIT DRAFT</p>
          </div>
        )}
      </div>
    );
  });
  return (
    <>
      <div className='table-representation'>
        <div className='column-representations'>
          {leftSide}
          <div className='right-side-scrollable'>{rightSide}</div>
        </div>
        {rowElements}
      </div>
      <RowHandler
        rows={rows}
        setRows={setRows}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        length={data.length}
        groupsLength={rowGroups.length}
      />
    </>
  );
};

export default TableComponent;
