import React, { useCallback, useEffect, useState } from 'react'
import styles from './Profile.module.scss'
import api from '../../api'

interface Props {
    id: number
    onClose: () => void
}

const Profile = ({ id, onClose }: Props) => {
    const [userInfo, setUserInfo] = useState<any>(null)
    const [error, setError] = useState<string|null>(null)

    const getUserInfo = useCallback(async () => {
        try {
            const data = await api.getUserInfo(id)
            setUserInfo(data.data)
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }, [])

    useEffect(() => {
        getUserInfo()
    }, [getUserInfo])

    const saveUserInfo = async () => {
        if (userInfo === null) return

        try {
            await api.saveUserInfo(id, userInfo)
            onClose()
            alert('User updated')
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }

    const deleteUser = async () => {
        try {
            await api.deleteUser(id)
            onClose()
            alert('User deleted')
        } catch (e) {
            setError(JSON.stringify(e))
        }
    }

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const id = e.target.id

        setUserInfo({...userInfo, [id]: e.target.value})
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.wrapper}>
                <button className={styles.closeBtn} onClick={onClose}>X</button>
                {userInfo?.avatar && <img src={userInfo.avatar} alt={userInfo.first_name}/>}
                <form>
                    <div>
                        <label htmlFor='first-name'>First name: </label>
                        <input id='first_name' type='text' defaultValue={userInfo?.first_name} onChange={onChange}/>
                    </div>
                    <div>
                        <label htmlFor='last-name'>Last name: </label>
                        <input id='last_name' type='text' defaultValue={userInfo?.last_name} onChange={onChange}/>
                    </div>
                    <div>
                        <label htmlFor='email'>E-mail: </label>
                        <input id='email' type='text' defaultValue={userInfo?.email} onChange={onChange}/>
                    </div>
                </form>
                <div>
                    <button onClick={deleteUser}>Удалить</button>
                    <button onClick={saveUserInfo}>Сохранить</button>
                </div>
                {error !== null && <div className={styles.error}>Error: {error}</div>}
            </div>
        </div>
    )
}

export default Profile