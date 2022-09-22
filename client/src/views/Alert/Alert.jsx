import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import Icon from "../../shared/components/Icon/Icon";
import { Container } from "./Alert.style";

const Alert = ({ alerts }) =>
	alerts !== null &&
	alerts.length > 0 &&
	alerts.map((alert, index) => (
		<Container
			key={alert._id}
			className={`alert alert-${alert.alertType}`}
			style={{ top: alerts.length > 1 ? 60 * index : 0 }}
		>
			<Icon type={alert.alertType} size={18} />
			{alert.msg}
		</Container>
	));

Alert.propTypes = {
	alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
	alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
