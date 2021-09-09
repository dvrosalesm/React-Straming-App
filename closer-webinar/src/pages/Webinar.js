import React, { Component } from "react";
import { FlexboxGrid, Col } from "rsuite";
import WebinarLayout from "./_layouts/WebinarLayout";
import StreamPlayer from "../components/StreamPlayer";
import StreamTitle from "../components/StreamTitle";
import Chat from "../components/Chat";
import Documents from "../components/Documents";
import Notes from "../components/Notes";
import { API } from "../core/API";
import Assistance from "../components/Assistance";
// import Register from '../components/Register';
// import FlexboxGridItem from 'rsuite/lib/FlexboxGrid/FlexboxGridItem';
import { Auth } from "../core/Auth";
var Loader = require("react-loaders").Loader;

class Webinar extends Component {
  constructor() {
    super();
    this.state = {
      event: {
        documents: [],
        streaming_configuration: {
          rmtp_url: "",
          enable_chat: 0,
          enable_documents: 0,
          enable_notes: 0,
          enable_registration: 1,
          status: 0,
        },
        name: "",
        company_logo: "",
      },
      loading: true,
      assistance: false,
      sizes: {
        streaming: 16,
        chat: 8,
        documents: 10,
        notes: 14,
        special_case: false,
      },
    };

    this.onAssistance = this.onAssistance.bind(this);
    this.onLogout = this.onLogout.bind(this);
    this.fetchEvent = this.fetchEvent.bind(this);
  }

  componentDidMount() {
    API.getEvent(
      {
        event: this.props.match.params.closerId,
      },
      (res) => {
        if (res.length > 0) res = res[0];
        this.setState({
          event: res,
          loading: false,
        });
        this.fetchEvent();
        if (res.streaming_configuration) {
          let configs = res.streaming_configuration;
          let sizes = this.state.sizes;
          if (configs.enable_chat === 0) {
            sizes.streaming = 24;
            sizes.chat = 0;
          }
          if (configs.enable_documents === 0 && configs.enable_notes === 0) {
            sizes.documents = 0;
            sizes.notes = 0;
          }
          if (configs.enable_documents === 1 && configs.enable_notes === 0) {
            sizes.documents = 24;
            sizes.notes = 0;
          }
          if (configs.enable_documents === 0 && configs.enable_notes === 1) {
            sizes.documents = 0;
            sizes.notes = 24;
          }
          if (configs.enable_chat === 0 && configs.enable_notes === 1) {
            sizes.special_case = true;
          }
          this.setState({
            sizes: sizes,
          });
        }

        if (window.innerWidth < 720) {
          this.setState({
            sizes: {
              notes: 24,
              streaming: 24,
              documents: 24,
              special_case: false,
            },
          });
        }
      },
      (e) => {}
    );
  }

  fetchEvent() {
    API.getEvent(
      {
        event: this.props.match.params.closerId,
      },
      (res) => {
        if (res.length > 0) res = res[0];
        this.setState({
          event: res,
          loading: false,
        });

        setTimeout(this.fetchEvent, this.randomIntFromInterval(20, 60) * 1000);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  onAssistance() {
    this.setState({ assistance: true });
    this.forceUpdate();
  }

  onLogout() {
    Auth.setCurrentUser(null);
    this.setState({
      assistance: false,
    });
    this.forceUpdate();
  }

  render() {
    const streamingUrl =
      this.state.event.streaming_configuration.vimeo_url &&
      this.state.event.streaming_configuration.vimeo_url !== ""
        ? this.state.event.streaming_configuration.vimeo_url
        : this.state.event.streaming_configuration.player_url;

    if (this.state.loading)
      return (
        <WebinarLayout
          companyLogo={this.state.event.company_logo}
          webinarBackground={this.state.event.background}
          hasLoaded={!this.state.loading}
        >
          <Loader type="line-scale" active />
          <div className="connecting-loader">Conectando...</div>
        </WebinarLayout>
      );

    if (!this.state.assistance && !this.state.loading)
      return (
        <WebinarLayout
          companyLogo={this.state.event.company_logo}
          webinarBackground={this.state.event.background}
          hasLoaded={false}
          showHeader={false}
        >
          <FlexboxGrid justify="center">
            <FlexboxGrid.Item componentClass={Col} colspan={24} md={16} sm={24}>
              <Assistance
                onAssistance={this.onAssistance}
                eventId={this.props.match.params.closerId}
                eventLogo={this.state.event.logo}
              />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        </WebinarLayout>
      );

    return (
      <WebinarLayout
        companyLogo={this.state.event.company_logo}
        webinarBackground={this.state.event.background}
        hasLoaded={!this.state.loading}
        handleLogout={this.onLogout}
        showHeader={true}
      >
        <FlexboxGrid>
          <FlexboxGrid.Item componentClass={Col} colspan={24} sm={24}>
            <StreamTitle title={this.state.event.name} />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        {this.state.sizes.special_case ? (
          <FlexboxGrid>
            <FlexboxGrid.Item componentClass={Col} colspan={14} sm={24}>
              <StreamPlayer streamingUrl={streamingUrl} />
            </FlexboxGrid.Item>
            <FlexboxGrid.Item componentClass={Col} colspan={10} sm={24}>
              <Notes eventId={this.props.match.params.closerId} />
            </FlexboxGrid.Item>
          </FlexboxGrid>
        ) : (
          <FlexboxGrid>
            {this.state.sizes.streaming !== 0 ? (
              <FlexboxGrid.Item
                componentClass={Col}
                colspan={this.state.sizes.streaming}
                md={this.state.sizes.streaming}
                sm={24}
              >
                <StreamPlayer streamingUrl={streamingUrl} />
              </FlexboxGrid.Item>
            ) : null}
            {this.state.sizes.chat !== 0 ? (
              <FlexboxGrid.Item
                componentClass={Col}
                colspan={this.state.sizes.chat}
                md={this.state.sizes.chat}
                xs={24}
              >
                <Chat eventId={this.props.match.params.closerId} />
              </FlexboxGrid.Item>
            ) : null}
          </FlexboxGrid>
        )}
        <FlexboxGrid>
          {this.state.sizes.documents !== 0 ? (
            <FlexboxGrid.Item
              componentClass={Col}
              colspan={this.state.sizes.documents}
              md={this.state.sizes.documents}
              xs={24}
            >
              <Documents documents={this.state.event.documents} />
            </FlexboxGrid.Item>
          ) : null}
          {this.state.sizes.notes !== 0 && !this.state.sizes.special_case ? (
            <FlexboxGrid.Item
              componentClass={Col}
              colspan={this.state.sizes.notes}
              md={this.state.sizes.notes}
              xs={24}
            >
              <Notes eventId={this.props.match.params.closerId} />
            </FlexboxGrid.Item>
          ) : null}
        </FlexboxGrid>
      </WebinarLayout>
    );
  }
}

export default Webinar;
