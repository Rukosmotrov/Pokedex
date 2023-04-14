import React, {useContext} from 'react';
import '../styles/pagination.scss';
import {Context} from "../context";

const Pagination = ({itemsPerPage, totalItems}) => {
    const {currentPage, setCurrentPage, firstItem, setFirstItem} = useContext(Context);

    const prevPage = () => {
        if (currentPage !== 1) {
            setCurrentPage(currentPage - 1);
            setFirstItem(firstItem - itemsPerPage);
            window.scrollTo(0, 0);
        }
    }

    const nextPage = () => {
        if (currentPage !== Math.ceil(totalItems/ itemsPerPage)) {
            setCurrentPage(currentPage + 1);
            setFirstItem(firstItem + itemsPerPage);
            window.scrollTo(0, 0);
        }
    }

    return (
        <div className={'paginationContainer'}>
            <i className={`arrow left ${currentPage === 1 && 'disabled'}`} onClick={prevPage}></i>
            <div key={currentPage} className={'paginationButton'}>
                <div>{currentPage}</div>
            </div>
            <i className={`arrow right ${currentPage === totalItems/ itemsPerPage && 'disabled'}`} onClick={nextPage}></i>
        </div>
    );
};

export default Pagination;