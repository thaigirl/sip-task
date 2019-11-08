关于我们



调度平台

开发指南

部署指南



项目简介

SIP-TASK是轻量级任务调度管理中心，通过执行器管理应用，基于执行器进行任务编排，最终由Quartz进行任务调度，并且对任务的流程状态、日志进行实时监控。

SIP-TASK支持微服务应用和单体应用接入



特性

- 简单：基于注解自动抓取任务，只需通过@ScheduleTask注解标识方法，支持通过web页面对任务进行操作
- 动态：支持动态修改任务状态，启停任务
- 隔离：每个运行任务的配置及参数享有一个副本，编辑任务时对正在运行的任务不影响
- 实时：任务在运行过程中的输出日志可以实时查看，日志收集逻辑为15秒(可配置)一次批量保存，或者15秒内累计达到10条(可配置)日志做一次批量保存
- 阻塞策略：调度过于密集执行器未能及时处理的任务，会在上一个任务完结后唤起
- 任务失败重试：支持自定义任务失败重试次数，如果执行器配置了多个链接，则进行轮询重试
- 任务失败告警：提供邮件方式告警，同时有独立的告警服务可选择接入
- 运行报表：支持实时查看运行数据，任务数量、调度次数、调度结果占比

UI预览


