import { useState } from 'react'
import './App.css'
import CreateWatchRoom from './pages/CreateWatchRoom'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import MyProfile from './pages/MyProfile'
import RoomHistory from './pages/RoomHistory'
import WatchRoomLobby from './pages/WatchRoomLobby'
import WatchingNow from './pages/WatchingNow'
import MovieOver from './pages/MovieOver'
import YourMovieTaste from './pages/YourMovieTaste'

function App() {
  const [page, setPage] = useState('login')

  const onNavigate = (targetPage) => {
    setPage(targetPage)
  }

  const renderPage = () => {
    switch (page) {
      case 'login':
        return <Login onNavigate={onNavigate} />
      case 'your_movie_taste':
        return <YourMovieTaste onNavigate={onNavigate} />
      case 'dashboard':
        return <Dashboard onNavigate={onNavigate} />
      case 'create_watch_room':
        return <CreateWatchRoom onNavigate={onNavigate} />
      case 'watch_room_lobby':
        return <WatchRoomLobby onNavigate={onNavigate} />
      case 'room_history':
        return <RoomHistory onNavigate={onNavigate} />
      case 'my_profile':
        return <MyProfile onNavigate={onNavigate} />
      case 'watching_now':
        return <WatchingNow onNavigate={onNavigate} />
      case 'movie_over':
        return <MovieOver onNavigate={onNavigate} />
      default:
        return <Login onNavigate={onNavigate} />
    }
  }

  return <div className="app-shell">{renderPage()}</div>
}

export default App
