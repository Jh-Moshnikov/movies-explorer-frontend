import './AboutProject.css';

function AboutProject() {
    return (
        <section className="about-project" id="about-project">
            <h2 className="about-project__title">О проекте</h2>
            <hr className='about-project__hr' />
            <div className="about-project__descriptions">
                <div className="about-project__description">
                    <h3 className="about-project__description-title">Дипломный проект включал 5 этапов</h3>
                    <p className="about-project__description-text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                </div>
                <div className="about-project__description">
                    <h3 className="about-project__description-title">На выполнение диплома ушло 5 недель</h3>
                    <p className="about-project__description-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
                </div>
            </div>
            <div className="about-project__plan">
                <div className="about-project__time about-project__week-first">1 неделя</div>
                <div className="about-project__time about-project__week-fourth">4 недели</div>
                <span className="about-project__task">Back-end</span>
                <span className="about-project__task">Front-end</span>
            </div>

        </section>
    );
}

export default AboutProject;