import {GithubIcon, TelegramIcon, MailIcon, CvRuIcon, CvEnIcon, Color} from "./icons";

import styles from '@/styles/icons.module.css'


export default function Footer({color = Color.Black}) {
  return (
    <div className={`${styles.contacts}`}>
      <a href="mailto:topenkoff@gmail.com" target="_blank">
        <MailIcon color={color}/>
      </a>
      <a href="https://t.me/topenkoff" target="_blank">
        <TelegramIcon color={color}/>
      </a>
      <a href="https://github.com/topenkoff" target="_blank">
        <GithubIcon color={color}/>
      </a>
      <a href="https://kayshev.com/cv/ru.pdf" target="_blank">
        <CvRuIcon color={color}/>
      </a>
      <a href="https://kayshev.com/cv/en.pdf" target="_blank">
        <CvEnIcon color={color}/>
      </a>
    </div>
  )
}
