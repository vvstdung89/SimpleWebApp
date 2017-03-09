# Questionnaire 
1. Given the below infrastructure image, in your opinion, what improvements could be made? What could be considered a security or performance risk?
	- Database could be replicated or sharding to increase read/write perforamnce
	- Why Redis, Socket Serivce in public sector? As API2 API3 is in private, redis as a cache dont need to run in public sector
	- Load balacing could be applied for API service (clone method and API Gateway upstream to these clone servers)

2.  In a hypothetical situation, AWS costs have been rising month to month by over 30%. What would you do to stem the rising costs?
	- First, identify the resource that cost money (computation power, ram, disk,...)
	- Then identify the problem whether it is from program
	- If from program, try to optimize it
	- If can not modify from program, re thinking about web app architecture
	- If cannot change program/architecture, find a good dedicated server, move costing service to that server (microservice) or all web app if possible

3. What would you consider to be the pros and cons of agile software development? 
	- Pros: easy to change feature to suit customer need, good for market that not stable, follow deadline is easier as features are completed within iteration periods. 
	- Cons: members in the team need to cooperate well,more pressure and responsibility, only work for a small team

# SimpleWebApp: The logics to create, remove or link member and reward.

1. Implement stack:
	- Nodejs
	- Mongodb

2. Installation 
	- Install Nodejs
	- Install mongodb, run on local
	- Download  project folder
	- Test: 
		- node UnitTest/link
		- node UnitTest/removeReward
	- Deploy
	 	- Run "npm start", it will run on port 15000

3. Project Assumtion
	- User identity by their ID (auto generate), each user must have a name.
	- Reward identity by their ID (auto generate), each reward must have a name and optional description 
	- This is jsut illustrate how to create, remove and link member and reward, not consider integrate with other modules.
	- In production code, we need to do detail work (such as check exist or duplicate when create, remove non exist document) and add that information to reply message such as status code, error message.




