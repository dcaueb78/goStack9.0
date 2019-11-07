/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import api from '../../services/api';

import Container from '../../components/Container';
import { Loading, Owner, IssueList, FilterList } from './styles';

export default class Repository extends Component {
  static propTypes = {
    match: PropTypes.shape({
      params: PropTypes.shape({
        repository: PropTypes.string,
      }),
    }).isRequired,
  };

  state = {
    repository: {},
    issues: [],
    loading: true,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.getIssues(repoName),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getIssues = async (repoName, state) => {
    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: state || 'all',
        per_page: 5,
      },
    });
    return issues;
  };

  handleFilter = async (e, state) => {
    e.preventDefault();
    const { match } = this.props;

    this.setState({
      loading: true,
    });

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await this.getIssues(repoName, state);

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  render() {
    const { repository, issues, loading } = this.state;

    if (loading) {
      return <Loading>Carregando</Loading>;
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Voltar aos repositórios</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <FilterList>
          <div>
            <bold>Filtrar</bold>
            <div>
              <button onClick={e => this.handleFilter(e, 'all')} type="button">
                All
              </button>
              <button onClick={e => this.handleFilter(e, 'open')} type="button">
                Open
              </button>
              <button
                onClick={e => this.handleFilter(e, 'closed')}
                type="button"
              >
                Closed
              </button>
            </div>
          </div>
        </FilterList>
        <IssueList>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div className="issue-row">
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                  {/* LABELS */}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
      </Container>
    );
  }
}
