
import Image from 'next/image';
import styles from './roue.module.scss';


export default function RoueSingle(){
    return(
        <>
            <section className={styles.rouePage}>
                <div className={styles.logoHeader}>
                    <Image src="" width={400} height={400} alt='logo' />
                    
                </div>
                <div className={styles.userForm}></div>
                <div className={styles.roueSection}></div>
                <div className={styles.pubSection}></div>
            </section>
        </>
    )
}