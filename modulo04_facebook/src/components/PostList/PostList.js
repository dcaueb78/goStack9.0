import React, { Component } from "react";
import PropTypes from "prop-types";
import "./PostList.css";

class PostList extends Component {
  state = {
    posts: [
      {
        id: 1,
        author: {
          name: "Julio Alcantara",
          avatar: "http://url-da-imagem.com/imagem.jpg"
        },
        date: "04 Jun 2019",
        content: "Pessoal, alguém sabe se a Rocketseat está contratando?",
        comments: [
          {
            id: 1,
            author: {
              name: "Diego Fernandes",
              avatar: "http://url-da-imagem.com/imagem.jpg"
            },
            content: "Conteúdo do comentário"
          }
        ]
      },
      {
        id: 2
        // Restante dos dados de um novo post
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
            <div>oi</div>
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
