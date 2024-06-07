'use client'
import Image from 'next/image';
import styles from './roue.module.scss';

export default function RoueSingle(){
    return(
        <>
            <section className={styles.rouePage}>
                <div className={styles.bannerBlock}>

                </div>
                <section className={styles.contentRoue}>
                    <div className={styles.logoHeader}>
                        <Image src="/img/logo.png" width={400} height={400} alt='logo' />
                        <button>Jouer ici<br /><span>good&nbsp;luck💘</span></button>        
                    </div>
                    <div className={styles.userForm}></div>
                    <div className={styles.roueSection}>
                        <Image src="/img/pique.png" width={30} height={30} />
                        {/* <Canvas id="canvas">
                        </Canvas> */}
                    </div>
                    <div className={styles.pubSection}>
                        Votre Publicite ICI 💘
                    </div>
                </section>
            </section>
        </>
    )
}