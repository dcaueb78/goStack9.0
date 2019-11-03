import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PostList.css";
import Post from "../Post/Post";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Cauê Kotarski",
          avatar:
            "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
        },
        date: "31 Out 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars1.githubusercontent.com/u/2254731?s=400&v=4"
            },
            content:
              "A Rocketseat está sempre em busca de novos membros para o time, e geralmente ficamos de olho em quem se destaca no Bootcamp, inclusive 80% do nosso time de devs é composto por alunos do Bootcamp. Além disso, se você tem vontade de ensinar gravando vídeos e criando posts, pode me chamar no Discord! (Sério, me chamem mesmo, esse comentário é real)"
          },
          {
            id: 2,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2,
        author: {
          name: "Julio Alcantara",
          avatar:
            "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 3,
        author: {
          name: "Julio Alcantara",
          avatar:
            "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar:
                "https://avatars0.githubusercontent.com/u/37030530?s=400&u=f705aa3b2f6167576c8024dada66351655195c81&v=4"
            },
            content: "Conteúdo do comentário"
          }
        ]
      }
    ]
  };

  // Executado assim que o componente aparece em tela
  componentDidMount() {}

  // Executado sempre que houver alteração nas props ou estado
  componentDidUpdate(_, prevState) {}

  //Executado quando o componente deixa de existir
  componentWillUnmount() {}

  render() {
    return (
      <>
        <div className="content">
          <aside></aside>
          <section className="timeline">
            {this.state.posts.map(post => (
              <Post key={post.id} data={post} />
            ))}
          </section>
          <aside></aside>
        </div>
      </>
    );
  }
}

// TechItem.defaultProps = {
//   tech: 'Oculto',
// };

// TechItem.propTypes = {
//   tech: PropTypes.string,
//   onDelete: PropTypes.func.isRequired,
// };

export default PostList;
