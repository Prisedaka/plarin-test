import React from 'react'
import { PaginationData } from '../../types'
import styles from './Pagination.module.scss'
import cx from 'classnames'

interface Props {
    data: PaginationData
    changePage: (page: number) => void
}

const Pagination = ({ data, changePage }: Props) => {
    const elements = data.totalPages ? Array.from(Array(data.totalPages).keys()) : []

    return (
        <div className={styles.wrapper}>
            {elements.map((item) => (
                <div
                    key={item}
                    className={cx(styles.listNumber, { [styles.currentList]: (item + 1 === data.page) })}
                    onClick={() => changePage(item + 1)}
                >
                    {item + 1}
                </div>
            ))}
        </div>
    )
}

export default Pagination