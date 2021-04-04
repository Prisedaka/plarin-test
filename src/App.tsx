import React, { useCallback, useEffect, useState } from 'react'
import styles from './App.module.scss'
import api from './api'
import { PaginationData, User } from './types'
import Pagination from './components/Pagination'
import cx from 'classnames'
import Profile from './components/Profile'

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [paginationData, setPaginationData] = useState<PaginationData | null>(null)
    const [userList, setUserList] = useState<User[]>([])
    const [showUserId, setShowUserId] = useState<number | null>(null)
    const [error, setError] = useState<string|null>(null)

    const changePage = (page: number) => {
        setCurrentPage(page)
    }

    const getUsersList = useCallback(async () => {
        try {
            const data = await api.getUsersList(currentPage)

            setPaginationData({
                page: data.page,
                perPage: data.per_page,
                total: data.total,
                totalPages: data.total_pages,
            })
            setUserList(data.data)
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }, [currentPage])

    useEffect(() => {
        getUsersList()
    }, [getUsersList])

    const addUser = useCallback(async () => {
        try {
            const data = await api.addUser()
            alert(`User created`)
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }, [])

    const showUserInfo = (id: number, e: any) => {
        setShowUserId(id)
    }

    const onCloseModal = () => {
        setShowUserId(null)
    }

    return (
        <div>
            <div className={styles.container}>
                {userList.length > 0 && userList.map((user) => (
                    <div key={user.id} className={styles.user} onClick={showUserInfo.bind(null, user.id)}>
                        {user.avatar && <img src={user.avatar} alt={user.first_name}/>}
                        <div>{user.first_name}</div>
                    </div>
                ))}
                <div className={cx(styles.newUser, styles.user)} onClick={addUser}>+</div>
            </div>
            {paginationData?.totalPages !== undefined && paginationData.totalPages > 1 &&
            <Pagination data={paginationData} changePage={changePage}/>}
            {showUserId !== null && <Profile id={showUserId} onClose={onCloseModal}/>}
            {error !== null && <div className={styles.error}>Error: {error}</div>}
        </div>
    )
}

export default App
