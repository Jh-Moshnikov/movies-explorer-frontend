import './Techs.css';

function Techs() {
    return (
        <section className="techs" id="techs">
            <h2 className="techs__name">Технологии</h2>
            <hr />
            <div className="techs__container">
                <h3 className="techs__title">7 технологий</h3>
                <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
                <ul className="techs__stacks">
                    <li className="techs__stack">HTML</li>
                    <li className="techs__stack">CSS</li>
                    <li className="techs__stack">JS</li>
                    <li className="techs__stack">React</li>
                    <li className="techs__stack">Git</li>
                    <li className="techs__stack">Express.js</li>
                    <li className="techs__stack">mongoDB</li>
                </ul>
            </div>
        </section>
    );
}

export default Techs;