import Link from "next/link"
import styles from './links.module.css'

const Links = () => {
    
  const links = [
		{
			title: 'Home Page',
			path: '/',
		},
		{
			title: 'Some Page',
			path: '/somePage',
		},
	];
    
  return (
		<div className={styles.links}>
			{links.map((link => (
				<button className={styles.button}>
					<Link href={link.path} key={link.path}>{link.title}</Link>
				</button>
			)))}
		</div>
  )
}

export default Links