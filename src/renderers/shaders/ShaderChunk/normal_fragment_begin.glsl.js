export default /* glsl */`
#ifdef FLAT_SHADED

	// Workaround for Adreno/Nexus5 not able able to do dFdx( vWorldPosition ) ...

	vec3 fdx = vec3( dFdx( vWorldPosition.x ), dFdx( vWorldPosition.y ), dFdx( vWorldPosition.z ) );
	vec3 fdy = vec3( dFdy( vWorldPosition.x ), dFdy( vWorldPosition.y ), dFdy( vWorldPosition.z ) );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal = normal * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

	#endif

	#ifdef USE_TANGENT

		vec3 tangent = normalize( vTangent );
		vec3 bitangent = normalize( vBitangent );

		#ifdef DOUBLE_SIDED

			tangent = tangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );
			bitangent = bitangent * ( float( gl_FrontFacing ) * 2.0 - 1.0 );

		#endif

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 geometryNormal = normal;

`;
