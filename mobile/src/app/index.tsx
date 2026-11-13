import { Redirect } from 'expo-router';import { LoginRoute } from '@/navigation/routes';export default function Index(){return <Redirect href={LoginRoute()}/>}
