import  React from 'react'
import headline from '../../public/article_images/genesis5.jpg';

export const abstract = 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae dolore iure natus quibusdam culpa? Quaerat quasi aspernatur laboriosam fuga, in dolor, error, facere amet cupiditate adipisci mollitia rem neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi repudiandae dolore iure natus quibusdam culpa?';
const Article = () => {
    return(
        <div>
            <h2>A New God Is Born</h2>
            <img src={headline} />
            <p>{abstract}</p>
            <p>Quae deserunt magnam quaerat consequatur esse doloribus alias, eius asperiores? Itaque veniam, illum a iusto pariatur obcaecati, eligendi sapiente eaque eveniet nesciunt sit minima. Placeat necessitatibus odit amet voluptates sapiente.Quae deserunt magnam quaerat consequatur esse doloribus alias, eius asperiores? Itaque veniam, illum a iusto pariatur obcaecati, eligendi sapiente eaque eveniet nesciunt sit minima. Placeat necessitatibus odit amet voluptates sapiente.</p>
            <p>Architecto perspiciatis aliquid placeat necessitatibus nulla quo culpa officiis harum atque blanditiis maxime cupiditate nemo veritatis eum tempore earum sapiente quasi unde consequatur vitae, dolore eos fugiat aliquam. Ratione, aliquam!Architecto perspiciatis aliquid placeat necessitatibus nulla quo culpa officiis harum atque blanditiis maxime cupiditate nemo veritatis eum tempore earum sapiente quasi unde consequatur vitae, dolore eos fugiat aliquam. Ratione, aliquam!</p>
            <p>Consectetur voluptate excepturi impedit vel, facilis doloremque doloribus quo voluptatibus atque beatae delectus modi, quas itaque. Exercitationem, cupiditate pariatur culpa nam laudantium unde. Exercitationem amet labore dolorum, aliquid rerum ipsa?Consectetur voluptate excepturi impedit vel, facilis doloremque doloribus quo voluptatibus atque beatae delectus modi, quas itaque. Exercitationem, cupiditate pariatur culpa nam laudantium unde. Exercitationem amet labore dolorum, aliquid rerum ipsa?</p>        
        </div>
    )
};
export const tags = ['genesis', 'plup', 'god', 'gods', 'born' ];

export default Article;