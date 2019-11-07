/* eslint-disable react/state-in-constructor */
/* eslint-disable react/static-property-placement */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaSpinner, FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import api from '../../services/api';

import Container from '../../components/Container';
import {
  Loading,
  Owner,
  IssueList,
  FilterList,
  Pagination,
  PaginationButton,
} from './styles';

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
    page: 1,
  };

  async componentDidMount() {
    const { match } = this.props;

    const repoName = decodeURIComponent(match.params.repository);

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      this.getIssues(),
    ]);

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    });
  }

  getIssues = async state => {
    const { match } = this.props;
    const { page } = this.state;

    const repoName = decodeURIComponent(match.params.repository);

    const issues = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: state || 'all',
        page: page || 1,
        per_page: 30,
      },
    });
    return issues;
  };

  handleFilter = async (e, state) => {
    e.preventDefault();

    this.setState({
      loading: true,
    });

    const issues = await this.getIssues(state);

    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  handlePageUpdate = async action => {
    const { page, state } = this.state;
    this.setState({
      loading: true,
    });
    this.setState({
      page: action === 'next' ? page + 1 : page - 1,
    });

    const issues = await this.getIssues(state, page);
    this.setState({
      issues: issues.data,
      loading: false,
    });
  };

  render() {
    const { repository, issues, loading, page } = this.state;

    if (loading) {
      return (
        <Loading>
          <div>
            <FaSpinner color="FFF" size="35" />{' '}
          </div>
        </Loading>
      );
    }

    return (
      <Container>
        <Owner>
          <div>
            <Link to="/">
              <FaArrowLeft size="30" />
            </Link>
          </div>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>
        <FilterList>
          <div>
            <b>Filtrar</b>
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
        <Pagination>
          <b>Página {page}</b>
          <div>
            <PaginationButton
              disabled={page === 1}
              onClick={() => this.handlePageUpdate('previous')}
            >
              <FaArrowLeft size="18" />
            </PaginationButton>

            <PaginationButton onClick={() => this.handlePageUpdate('next')}>
              <FaArrowRight size="18" />
            </PaginationButton>
          </div>
        </Pagination>
      </Container>
    );
  }
}
