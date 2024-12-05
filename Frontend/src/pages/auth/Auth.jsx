import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs'
import logo from '../../assets/login2.png'
import victory from '../../assets/victory.svg'
import { useState } from 'react'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { apiClient } from '../../lib/api-client'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '../../utils/constants'
import { useNavigate } from 'react-router-dom'
import { useAppStore } from '@/store'

const Auth = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const navigate = useNavigate()
  const { setUserInfo } = useAppStore()

  const validateLogin = () => {
    if (!email.length) {
      toast.error('Email is required.')
      return false
    }
    if (!password.length) {
      toast.error('Password is required.')
      return false
    }
    return true
  }

  const validateSignup = () => {
    if (!email.length) {
      toast.error('Email is required.')
      return false
    }
    if (!password.length) {
      toast.error('Password is required.')
      return false
    }
    if (password !== confirmPassword) {
      toast.error('ConfirmPassword is not match.')
      return false
    }
    return true
  }

  const handleLogin = async () => {
    if (validateLogin()) {
      const res = await apiClient.post(LOGIN_ROUTE, { email, password }, { withCredentials: true })
      if (res.status === 200) {
        navigate('/profile')
      }
      if (res.data.user.id) {
        setUserInfo(res.data.user)
        if (res.data.user.profileSetup) navigate('/chat')
        else navigate('/profile')
      }
      console.log(res)
    }
  }

  const handleSignup = async () => {
    if (validateSignup()) {
      const res = await apiClient.post(SIGNUP_ROUTE, { email, password }, { withCredentials: true })
      if (res.status === 201) {
        setUserInfo(res.data.user)
        navigate('/profile')
      }
      console.log(res)
    }
  }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
      <div
        className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl 
      w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'
      >
        <div className='flex flex-col gap-10 items-center justify-center w-full'>
          <div className='flex items-center justify-center flex-col'>
            <div className='flex items-center justify-center'>
              <h1 className='text-5xl font-bold md:text-6xl'>Welcome</h1>
              <img src={victory} alt='Victory Emoji' className='h-[100px]' />
            </div>
            <p className='font-medium text-center'>Fill in the details to get started with the best chat app!</p>
          </div>
          <div className='flex items-center justify-center w-full'>
            <Tabs className='w-3/4' defaultValue='login'>
              <TabsList className='bg-transparent rounded-none w-full flex'>
                <TabsTrigger
                  value='login'
                  className='data-[state=active]:bg-transparent text-black 
                 border-b-4 rounded-none w-full data-[state=active]:text-black
                data-[state=active]:font-semibold data-[state=active]:border-b-purple-800 p-3 transition-all duration-300
                '
                >
                  Login
                </TabsTrigger>
                <TabsTrigger
                  value='signup'
                  className='data-[state=active]:bg-transparent text-black 
                 border-b-4 rounded-none w-full data-[state=active]:text-black
                data-[state=active]:font-semibold data-[state=active]:border-b-purple-800 p-3 transition-all duration-300
                '
                >
                  Signup
                </TabsTrigger>
              </TabsList>
              <TabsContent className='flex flex-col gap-5 mt-10' value='login'>
                <Input
                  placeholder='Email'
                  type='email'
                  className='rounded-full p-6'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder='Password'
                  type='password'
                  className='rounded-full p-6'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button className='rounded-full p-6' onClick={handleLogin}>
                  Sign in
                </Button>
              </TabsContent>
              <TabsContent className='flex flex-col gap-5' value='signup'>
                <Input
                  placeholder='Email'
                  type='email'
                  className='rounded-full p-6'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                  placeholder='Password'
                  type='password'
                  className='rounded-full p-6'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Input
                  placeholder='Confirm Password'
                  type='password'
                  className='rounded-full p-6'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button className='rounded-full p-6' onClick={handleSignup}>
                  Signup
                </Button>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className='hidden xl:flex justify-center items-center'>
          <img src={logo} alt='background' className='h-[700px]' />
        </div>
      </div>
    </div>
  )
}

export default Auth
