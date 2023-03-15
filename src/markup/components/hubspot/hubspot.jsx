import React from 'react';
import { Helmet } from 'react-helmet';

export default function Hubspot (props){
	return(
		<>

			<Helmet>
				{/* Start of HubSpot Embed Code */}
				<script type="text/javascript" id="hs-script-loader" async="" defer="" src="//js.hs-scripts.com/8401183.js"></script>		
				{/* End of HubSpot Embed Code */}
			</Helmet>
		</>
	);
    
}
