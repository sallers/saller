import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import useBaseUrl from '@docusaurus/useBaseUrl';


// var base = 'my-website';
// const fullLink = useBaseUrl(link);

const FeatureList = [
  {
    title:<a href='/my-website/docs/faq/General'><font color='black'>Frequently Asked Questions</font></a>,

    Svg: require('@site/static/img/book.svg').default,

    description: (
      <>
        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/faq/General">    1. General </a>
        </div>

        <hr style={{ margin: '0.25rem 0' }}/>

        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/faq/Installation">    2. Installation</a>
        </div>


        <hr style={{ margin: '0.25rem 0' }}/>

        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/category/basic-knowledge">    3. Basic Knowledge </a>
        </div>


        <hr style={{ margin: '0.25rem 0' }}/>
        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/category/simulation-setup" >    4. Simulation Setup </a>
        </div>


        <hr style={{ margin: '0.25rem 0' }}/>
        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/faq/ObtainTechnicalSupport" >    5. Contact Us </a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>

      </>
    ),


  },
  {
    // title: 'Tutorials',
    title:<a href='/my-website/docs/tutorial/1Material'><font color='black'>Max-Optics GUI</font></a>,

    Svg: require('@site/static/img/hat.svg').default,
    description: (
      <>
              {/* <hr /> */}

      <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/3Simulation/1FDE">1.What is FDE?</a>
      </div>
      <hr style={{ margin: '0.25rem 0' }}/>


      <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/3Simulation/2FDTD">2.What is the FDTD?</a>
      </div>
      <hr style={{ margin: '0.25rem 0' }}/>

      <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/3Simulation/3EME">3.What is the EME?</a>
      </div>
      <hr style={{ margin: '0.25rem 0' }}/>


      <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/1Material">4.How to set material?</a>
      </div>
      <hr style={{ margin: '0.25rem 0' }}/>

      <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/2Structure">5.How to add the structures?</a>
      </div>
      <hr style={{ margin: '0.25rem 0' }}/>



      </>
    ),
  },

  {
    // title: 'Example Library',
    title:<a href='/my-website/docs/category/passive-devices'><font color='black'>Example Library</font></a>,

    to:'/docs/examples/Grating/',
    Svg: require('@site/static/img/document.svg').default,
    description: (
      <>
       {/* <hr /> */}
        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/category/passive-devices-1">1.SDK Passive Devices</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>

        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/category/active-devices">2.SDK Active Devices</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>


        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/category/passive-devices">3.GUI Passive Devices</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>


        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/category/active-devices">4.GUI Active Devices</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>

        {/* <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/t1">5.PD(by SDK)</a>
        </div> */}
        {/* <hr style={{ margin: '0.25rem 0' }}/> */}

        {/* <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/examples/Active_Device/MOD/">4.MOD</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/> */}

        {/* <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/tutorial/material">7.MOD(by SDK)</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/> */}


      </>
    ),
  },


  {
    // title: 'How do I',
    title:<a href='/my-website/docs/category/max-optics-sdk'><font color='black'>Max-Optics SDK</font></a>,

    Svg: require('@site/static/img/tool.svg').default,
    description: (
      <>
         {/* <hr /> */}
        <div style={{ textAlign: 'left' }}>
          <a href="/my-website/docs/test/SDK/1Material">1.How can I add an anisotropic material with the SDK?</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>

        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/test/SDK/5Mornitor">2.How can I add a monitor with the SDK?</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>


        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/test/SDK/6Simulation">3.How can I create a simulation with the SDK?</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>

        <div style={{ textAlign: 'left' }}>
        <a href="/my-website/docs/test/SDK/2Structure">4.How can I adjust the structure with the SDK?</a>
        </div>
        <hr style={{ margin: '0.25rem 0' }}/>




      </>
    ),
  },

];


function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--6')} style={{ paddingLeft: '50px', paddingRight: '50px'}}>
      <div className='title'>
        <div className="text--left">
          <Svg className={styles.featureSvg} role="img" />
        </div>
        <div className="feature-content">
          <h3 style={{fontSize:25,marginBottom: '1rem'}}>{title}</h3>
        </div>
      </div>

      <div className="text--left padding-horiz--md">
        <p>{description}</p>
      </div>
    </div>
  );
}




export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}


